# The Engineering Behind this app

This is a portfolio project, that aims at exploring the Frontend As a Service architecture paradigm, together with some principles of Everything as Code, and a high bar for Quality Assurance (read BDD and TDD).

## Tech stack

The application is constructed with a Serverless Backend (ok, ok, FaaS) and a static frontend, aka the Jamstack.

### Frontend
We use Tailwind CSS with Nuxt.js to generate a static frontend.

Babel is transpiling the Javascript from ECMEA6.

Development server runs on Node, and Node is packed in a Docker container.

We use Makefile as a build script.

The static frontend is hosted for free at [GithubPages](https://pages.github.com/).

### Backend
We use an IaC approach, with a remote backend on [Terraform Cloud](https://app.terraform.io/app/mathmagicians/workspaces) to create infrastucture on AWS.

We use a REST Api Gateway, Lambda functions, Cloud Watch logs and Dynamo DB.

Our lambda functions are coded using Golang.

### Cloud Resources
The project is using cloud resources from the generous free tier at AWS (Stockholm).

### 3rd party integrations

#### Running data
We are using Strava to get data from our users. 

This requires an OAuth2.0 integration, and storing refresh tokens for athletes safely.

The Strava API has usage limits, each app can make up to 1000 daily calls, and we have implemented throttling in the backend.


#### Maps
Maps and maptiles come from MapBox, that builds on OpenStreetMap, and are displayed through the Leaflet component.

#### OAuth 2.0
We use OAuth2.0, together with a social facebook login, and store userdata in AWS Cognito User Pools, seperate from application data. 

### Source control
We use Github to host the source code:
- [Frontend](https://github.com/Mathmagicians/supercalifragilistic-run)
- [Backend](https://github.com/Mathmagicians/supercalifragilistic-run-lambda)

### CI-CD
We use Github Actions as build server.

We have a CI job that produces and publishes a build artifact.
We have a CD job that deploys the build artifact (ie uploads static frontend to GithubPages for the frontend project, and triggers Terraform to provision cloud ressources for backend project).


### BDD and TDD
We have a full suite of component tests for the backend.
We have simple smoke tests for the frontend.

## Architecture

The project is an example of a serverless, event driven microservice architecture, where the static frontent queries cloudbased functions.
Data are peristed in a NoSQL database.
Everything is fully scalable.

## Infrascture as Code 
We use Terraform for creating and destroying all cloud resources for the project.
We use Terraform Cloud to ensure our statefiles are safe.

## License
Open Source, under the [MIT license](https://github.com/Mathmagicians/supercalifragilistic-run/blob/main/LICENSE).
