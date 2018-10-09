const redirect_uri = "http://"+location.hostname+(location.port ? ':'+location.port: '')+"/authorize";

export default {
    redirect_uri: redirect_uri,
}