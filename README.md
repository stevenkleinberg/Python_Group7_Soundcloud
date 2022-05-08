# Sound Town

This is a clone of [Soundcloud](https://soundcloud.com/). Access the [Sound Town MVP](https://sound-town.herokuapp.com/).

**Sound Town** is the place to go to share music and listen to music uploaded by others.

# Index
|
[MVP Feature List](https://github.com/stevenkleinberg/Python_Group7_Soundcloud/wiki/MVP-Feature-List) |
[Database Schema](https://github.com/stevenkleinberg/Python_Group7_Soundcloud/wiki/Database-Schema) |
[API Documentation](https://github.com/stevenkleinberg/Python_Group7_Soundcloud/wiki/API-Documentation) |
[Frontend Routes](https://github.com/stevenkleinberg/Python_Group7_Soundcloud/wiki/Frontend-Routes) |


# Technologies Used
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/javascript/javascript-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/react/react-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/redux/redux-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/nodejs/nodejs-plain-wordmark.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/flask/flask-original-wordmark.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/postgresql/postgresql-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/sqlalchemy/sqlalchemy-original-wordmark.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/css3/css3-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/html5/html5-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/git/git-original.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/docker/docker-original-wordmark.svg" height=40 />
<img src="https://github.com/devicons/devicon/blob/v2.15.1/icons/vscode/vscode-original.svg" height=40 />


# Getting started

1. Clone this repo.

    * ```git clone git@github.com:stevenkleinberg/Python_Group7_Soundcloud.git```

2. Install frontend dependencies in the `react-app` directory.

    * ```npm install```

3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL.

    * ```CREATE USER <db_username> WITH CREATEDB PASSWORD <'db_password'>;```
    * ```CREATE DATABASE <db_name> WITH OWNER <db_username>;```

4. Back in the root directory, install back-end dependencies in a python virtual environment.

    * ```pipenv install --python "$PYENV_ROOT/shims/python"```
    * ```pipenv shell```

4. Create a .env file in the backend directory based on the .env.example found within the respective directory.

5. Follow [these instructions](https://github.com/jamesurobertson/aws-s3-pern-demo#create-your-aws-user-and-bucket) to create your aws user and bucket, and obtain your credentials (stop after the __Create your AWS User and Bucket__ section). You will need these credentials in subsequent steps to set up your environment.

6. Enter your username and password information into your .env file along with your desired database name, a secured combination of characters for your SECRET_KEY, and enter the credentials for AWS S3 from the previous step.

7. Create Database, Migrate, and Seed models.

    * ```flask db migrate```
    * ```flask seed all```

9. Start the services in the frontend directory (`react-app`), which should open the project in your default browser. If not, navigate to http://localhost:3000.

    * ```npm start```

10. You can use the Demo user or create an account to begin using **Sound Town**.

# Features

Logged in users can perform the following actions.

 - Add/View/Edit/Delete Songs
 - Add/View/Edit/Delete Comments
