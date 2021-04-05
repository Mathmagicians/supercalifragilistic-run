# The Engineering Behind this app

## Tech stack

The application is costructed with a Serverless Backend (ok, ok, FaaS) and a static frontend, aka the Jamstack.

### Source control
We use Github to host the source code:
- [Frontend](https://github.com/Mathmagicians/supercalifragilistic-run)
- [Backend](https://github.com/Mathmagicians/supercalifragilistic-run-lambda)

### CI-CD
We use Github Actions as build server.

We have a CI job that produces a build artifact, and a CD job, that publishes the artifact.

### Frontend
We use Tailwind CSS with Nuxt.js to generate a static frontend. 
Babel is transpiling the Javascript from ECMEA6.

Development server runs on Node, and Node is packed in a Docker container.

We use Makefile as a build script.

### Backend
We use an IaC approach, with a remote backend on [Terraform Cloud](https://app.terraform.io/app/mathmagicians/workspaces) to create infrastucture on AWS.

We use a REST Api Gateway, Lambda functions, Cloud Watch logs and Dynamo DB.

Our lambda functions are coded using Golang.

## Architecture

Eventdriven, serverless, NoSQL.

## License
Open Source, under the [MIT license]().
