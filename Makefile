.PHONY: c23wa callback check clean clean-env dev .env .env-local git-commit lint lint-fix node query-jq query-tf smoke tf-token w3w-3wa

# on Github actions this is set as env variable (passed as secret), on local dev machine, you need to have the terraform token locally
//export TF_API_TOKEN ?= $(shell cat ~/.terraform.d/credentials.tfrc.json | grep "token" | awk '{print $$2}' | sed 's/"//g')
export STRAVA_CLIENT_ID ?= $(shell jq '.client_id'  ~/.strava  | sed 's/"//g')
//export W3W_API_TOKEN ?= $(shell cat ~/.what3words)
tf_work = prod
TF_API := https://app.terraform.io/api/v2/organizations/mathmagicians/workspaces/supercalifragilistic-run-lambda
W3W_API := https://api.what3words.com/v3
STRAVA_API := https://www.strava.com/api/v3

all: dev

clean: clean-env
	@rm -rf ./dist

clean-env:
	@rm -f .env .query-tf-output.JSON

dev: .env-local
	@docker-compose up web

node:
	@docker-compose run --entrypoint sh  web

smoke:
	npm run test:smoke

lint:
	npm run lint:js

lint-fix:
	npm run lint:fix

dist: clean
	npm run generate

tf-token:
	@echo $(TF_API_TOKEN)

check: export tf_work=dev-ap
check: .env-local
	@echo workspace $(tf_work) tf-api $(TF_API)
	cat .env

.env-local: export tf_work=dev-ap
.env-local: .env

.env: clean-env
	@echo $(tf_work)
	@$(MAKE) query-tf tf_work=$(tf_work)
	@$(MAKE) query-jq query="\"rest_api_stage\""
	@$(MAKE) query-jq query="\"user_pool_domain\""
	@$(MAKE) query-jq query="\"user_pool_client_secret\""
	@$(MAKE) query-jq query="\"user_pool_client_id\""
	@$(MAKE) query-jq query="\"app_auth_callback_url_root\""
	@$(MAKE) query-jq query="\"facebook_app_url\""
	@$(MAKE) query-jq query="\"strava_client_id\""
	@$(MAKE) query-jq query="\"strava_client_secret\""
	@$(MAKE) git-commit
	@rm .query-tf-output.JSON

git-commit:
	@git rev-parse HEAD \
 	| xargs -I V echo "git_commit=V" \
 	>> .env

query-tf:
	@curl \
	--header "Authorization: Bearer $(TF_API_TOKEN)" \
	--header "Content-Type: application/vnd.api+json" \
	"$(TF_API)-$(tf_work)?include=outputs" \
	> .query-tf-output.JSON


query-jq:
	@cat .query-tf-output.JSON \
	| jq '.included[] | select(.attributes.name==$(query)).attributes.value' \
    | xargs -I V echo "$(query)=V" \
    >> .env

w3w-3wa:
	@curl -v \
	--header "X-Api-Key: $(W3W_API_TOKEN)" \
	"$(W3W_API)/convert-to-coordinates?words=sifts.business.nimbly" \
	| jq

c23wa: #Coordinates as a comma separated string of latitude and longitude
	@curl -v -X GET \
	--header "X-Api-Key: $(W3W_API_TOKEN)" \
	 --data-urlencode "coordinates=55.666667,12.583477" \
    -G "$(W3W_API)/convert-to-3wa" \
    | jq

strava-authorize: #beginning of strava authorization flow
	@echo $(STRAVA_CLIENT_ID)
	@curl -v -X GET \
	-d client_id=$(STRAVA_CLIENT_ID) \
	-d redirect_uri="https://localhost:3083/supercalifragilistic-run" \
	-d response_type=code \
	-d approval_prompt=force \
	-d scope=activity:read_all \
	-G "https://strava.com/oauth/authorize" \


strava-token:
	@curl -v \
	-F client_id=$(shell jq '.client_id'  ~/.strava) \
	-F client_secret=$(shell jq '.client_secret' ~/.strava) \
	-F code=$(shell cat ~/.strava_secret) \
	-F grant_type=authorization_code \
	 "https://www.strava.com/oauth/token" \
	| jq

strava-activity: #single example activity
	@curl -v -X GET \
	--header "Authorization: Bearer $(shell cat .strava)" \
	"$(STRAVA_API)/athlete/activities" \
	| jq '.[0]'
