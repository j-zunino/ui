{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  packages = with pkgs; [
    emmet-ls
    eslint_d
    nodejs_24
    pnpm
    prettierd
    tailwindcss-language-server
    vscode-langservers-extracted
    typescript
  ];
}
