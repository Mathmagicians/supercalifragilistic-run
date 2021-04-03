.PHONY: dev lambda-url node tf-token

TF_TOKEN := $(shell cat ~/.terraform.d/credentials.tfrc.json | grep "token" | awk '{print $$2}' | sed 's/"//g')
TF_API := https://app.terraform.io/api/v2/organizations/mathmagicians/

dev:
	@docker-compose up web

node:
	@docker-compose run --entrypoint sh  web

tf-token:
	@echo $(TF_TOKEN)

lambda-url:
	curl --header "Authorization: Bearer $(TF_TOKEN)" \
	--header "Content-Type: application/vnd.api+json" \
	"$(TF_API)/workspaces/supercalifragilistic-run-lambda-prod?include=outputs" \
	| jq '.included[] | select(.attributes.name=="gateway_deployment").attributes.value ' > env.prod
