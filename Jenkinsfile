properties properties: [
        [$class: 'BuildDiscarderProperty', strategy: [$class: 'LogRotator', artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '10']],
        [$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/TobiasHennig/nativescript-toast/'],
]

@Library('mare-build-library')
def nodeJS = new de.mare.ci.jenkins.NodeJS()
def git = new de.mare.ci.jenkins.Git()

node('nativescript') {

    def workspace = env.WORKSPACE

    // PRINT ENVIRONMENT TO JOB
    echo "workspace directory is $workspace"
    echo "PATH is $env.PATH"

    try {
        stage('Checkout') {
            checkout scm
        }

        stage('Build') {
            nodeJS.nvmRun('clean')
        }

        stage('Test') {
            nodeJS.nvmRun('test')
            junit 'test/android/build/reports/TEST-*.xml'
        }

        stage('E2E') {
            nodeJS.nvmRun('e2e')
            junit 'tmp/TEST-*.xml'
        }

        if(git.isDevelopBranch() || git.isFeatureBranch()){
          stage('Publish NPM snapshot') {
            nodeJS.publishSnapshot('.', env.BUILD_NUMBER, env.BRANCH_NAME)
          }
        }

    } catch (e) {
        mail subject: "${env.JOB_NAME} (${env.BUILD_NUMBER}): Error on build", to: 'github@martinreinhardt-online.de', body: "Please go to ${env.BUILD_URL}."
        throw e
    }
}
