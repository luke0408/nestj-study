{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [];

  # Sets environment variables in the workspace
  env = {
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
