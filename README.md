# supercalifragilistic-run

# For testers
The production version of the application is available at [https://www.mathmagicians.dk/supercalifragilistic-run/profile/](https://www.mathmagicians.dk/supercalifragilistic-run/profile/)

All communication, feature requests and test results happens trough [Github issues](https://github.com/Mathmagicians/supercalifragilistic-run/issues).
You need to create a GitHub account, to be able to comment.
# For Developers
## Setup terraform workspace for local dev
Setup your terraform workspace, as described in [backend project](supercalifragilistic-run-lambda).
We use naming standard `dev-{your initials}`

## Local Build / dev Setup

```bash
# grab local env variables from terraform cloud
$ make .env-local
# install dependencies and run dev server
$ make dev

# lint & fix
$ make lint-fix
```
