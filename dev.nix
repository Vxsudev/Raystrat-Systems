{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = [
    pkgs.nodejs_20
    pkgs.corepack
    (pkgs.pnpm.override { version = "10.0.0"; }) # ✅ pinned pnpm version
  ];
}
