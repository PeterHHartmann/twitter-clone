---
layout: post
title:  "Presentation"
date:   2023-01-25 21:21:25 +0100
architecture_diagram: /assets/images/architecturediagram.png
erd: /assets/images/erd.png
pipelinestatus: /assets/images/pipelinestatus.png
---

## The project

- A twitter-clone developed using the TypeScript

- [Demo](http://139.177.182.119/)

![]({{page.architecture_diagram | relative_url}})

# Database

- PostgreSQL as database system of choice

- Relational database

- Used for storing user data

- Need for stuctured data

![]({{page.erd | relative_url}})

# Version Control

- Mono-repo containing frontend and backend

- Protected default branch named "main" for production ready code

- Development branch named "dev"

# Quality Assurance

- Testing
  - Unit testing using Jest
  - End to end testing the frontend using Cypress
<br/><br/>
- Linting using Eslint

- Continous Integration
  - Linting and testing is run on merge request to main branch
  - Test code coverage generated and saved
![]({{page.pipelinestatus | relative_url}})
  - Merge cannot complete unless these jobs succeeds
<br/><br/>
- Continous Delivery / Continous Deployment 
  - When main branch receives a merge, project is deployed on Linode VPS via. SSH
<br/><br/>
- Documentation statically generated using Jekyll and automatically deployed using Gitlab Pages

# Containerization

- Frontend server, backend api server, postgres database each in their own container

- Multi-container application using docker-compose

- Containers communicate through docker networks

- Database data and user images are persisted using docker volumes