{ pkgs ? import <nixpkgs> {} }:
let
  inherit (pkgs) mkShell;
in
mkShell {
  packages = with pkgs; [
    nodejs_20 # Or specify another version
    # Add other packages here
  ];
}
