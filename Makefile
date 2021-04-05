.PHONY: dev lambda-url lint lint-fix node smoke tf-token

# on Github actions this is set as env variable (passed as secret), on local dev machine, you need to have the terraform token locally
export TF_API_TOKEN ?= $(shell cat ~/.terraform.d/credentials.tfrc.json | grep "token" | awk '{print $$2}' | sed 's/"//g')
TF_API := https://app.terraform.io/api/v2/organizations/mathmagicians/

dev:
	@docker-compose up web

node:
	@docker-compose run --entrypoint sh  web

tf-token:
	@echo $(TF_API_TOKEN)

lambda-url:
	@curl --header "Authorization: Bearer $(TF_API_TOKEN)" \
	--header "Content-Type: application/vnd.api+json" \
	"$(TF_API)/workspaces/supercalifragilistic-run-lambda-prod?include=outputs" \
	| jq '.included[] | select(.attributes.name=="gateway_deployment").attributes.value ' \
	| xargs -t -I V echo "LAMBDA_API_ROOT=V" \
	> .env

smoke:
	npm run test:smoke

lint:
	npm run lint:js

lint-fix:
	npm run lint:fix
