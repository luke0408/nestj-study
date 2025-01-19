{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [
  ];

  # Sets environment variables in the workspace
  env = {
    DB_TYPE = "mysql";
    LOCAL_DB_HOST = "localhost";
    LOCAL_DB_PORT = "33006";
    LOCAL_DB_USERNAME = "root";
    LOCAL_DB_PASSWORD = "password";
    LOCAL_DB_DATABASE = "testDB";
  };

  # Set service
  services = {
    docker = {
      enable = true;
    };
  };

  idx = {
    extensions = [];

    # Enable previews
    previews = {
      enable = true;
      previews = {};
    };

    # Workspace lifecycle hooks
    workspace = {
      onCreate = {};
      onStart = {};
    };
  };
}
