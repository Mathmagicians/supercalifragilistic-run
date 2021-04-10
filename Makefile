.PHONY: c23wa clean dev lambda-url lint lint-fix node smoke tf-token w3w-3wa

# on Github actions this is set as env variable (passed as secret), on local dev machine, you need to have the terraform token locally
export TF_API_TOKEN ?= $(shell cat ~/.terraform.d/credentials.tfrc.json | grep "token" | awk '{print $$2}' | sed 's/"//g')
export W3W_API_TOKEN ?= $(shell cat ~/.what3words)
TF_API := https://app.terraform.io/api/v2/organizations/mathmagicians/
W3W_API := https://api.what3words.com/v3
STRAVA_API := https://www.strava.com/api/v3

all: dev

clean:
	@rm -rf ./dist

dev: lambda-url
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

lambda-url:
	curl \
	--header "Authorization: Bearer $(TF_API_TOKEN)" \
	--header "Content-Type: application/vnd.api+json" \
	"$(TF_API)/workspaces/supercalifragilistic-run-lambda-prod?include=outputs" \
	| jq '.included[] | select(.attributes.name=="rest_api_stage").attributes.value ' \
	| xargs -t -I V echo "LAMBDA_API_ROOT=V" \
	> .env

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
	@curl -v -X GET \
	-d client_id=$(shell jq '.client_id'  ~/.strava) \
	-d redirect_uri="https://www.mathmagicians.dk/supercalifragilistic-run" \
	-d response_type=code \
	-d approval_prompt=force \
	-d scope=activity:read_all \
	-G "https://strava.com/oauth/authorize" \
	| jq

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
