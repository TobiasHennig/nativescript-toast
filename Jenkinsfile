properties properties: [
        [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
        [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/TobiasHennig/nativescript-toast/'],
]

node('nativescript') {
    def buildNumber = env.BUILD_NUMBER
    def mvnHome = '/opt/dev/apache-maven-3.3.1'
    def workspace = env.WORKSPACE
    def buildUrl = env.BUILD_URL
    env.PATH = "${env.JAVA_HOME}/bin:${mvnHome}/bin:${env.PATH}"

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "build URL is $buildUrl"
    echo "build Number is $buildNumber"
    echo "PATH is $env.PATH"

    try {
        stage('Checkout') {
            checkout scm
        }

        stage('Build') {
            sh "npm run clean"
            sh "npm install"
        }

        stage('Test') {
            sh "npm run test"
            junit 'test/android/build/reports/TEST-*.xml'
        }

        stage('E2E') {
            sh "npm run pre-e2e"
            sh "npm run e2e"
            junit 'tmp/TEST-*.xml'
        }

        stage('Publish NPM snapshot') {
            def currentVersion = sh(returnStdout: true, script: "npm version | grep \"{\" | tr -s ':'  | cut -d \"'\" -f 4").trim()
            def newVersion = "${currentVersion}-${buildNumber}"
            sh "npm version ${newVersion} --no-git-tag-version && npm publish --tag next"
        }

    } catch (e) {
        mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
        throw e
    }
}