interface HotMod extends NodeJS.Module {
  hot: {
    accept: any
    dispose: any
  }
}

declare let module: HotMod
