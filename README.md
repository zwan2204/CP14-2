# CP14-2
Group 40 capstone project


## Installation

Use npm insall to install the package

```bash
cd CP14-2
npm install
```

## Development

```bash
npm run start
```

## Deployment 

1. Fork the repository

2. Login to the [Amplify Console](https://console.aws.amazon.com/amplify/home) and choose Get started under Deploy. Grant Amplify permission to read from your GitHub account or organization that owns your repo.

3. The Amplify Console will detect that the amplify.yml file is in the repo. Choose Next.

4. Go to rewrites and redirects setting, add following setting:
```bash
Source address: </^[^.]+$|\.(?!(css|gif|ico|jpg|json|js|png|txt|svg|woff|ttf)$)([^.]+$)/>
Target address: /index.html
Type: 200
```
5. Go to build setting, make sure the node version is >= 12.13.0 
```bash
nvm use 12
```

6. Review your settings and choose Save and deploy. Your app will now be deployed to a https://branchname.xxxxxx.amplifyapp.com URL.

## Backend Repository
[Backend](https://github.com/zihanmo/CP14-2-Backend)
