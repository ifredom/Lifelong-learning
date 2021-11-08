// 问题：
// 1.当调用MusicEngine时，只希望初始化一次实例 MusicEngine
// 2.在TestCore中只有当 MusicEngine处于播放状态时，才允许打印信息。

class ClassA {
  private static instance: ClassA;
  isPlaying: boolean;
  testCore: ClassB;
  constructor() {
    this.isPlaying = true;
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new ClassA();
    }
    return this.instance;
  }

  initMusicEngine() {
    this.testCore = new ClassB();
  }
  printTestInfo() {
    this.testCore.printInfo();
  }
}
class ClassB {
  musicEngine: ClassA;
  constructor() {
    this.musicEngine = ClassA.getInstance();
  }
  printInfo() {
    if (this.musicEngine.isPlaying) {
      console.log("打印调试信息");
    }
  }
}

// 调用
const here = new ClassA();
var x = ClassA.getInstance();
var y = ClassA.getInstance();
console.log(x === y);
console.log(here);

here.initMusicEngine();
here.testCore.printInfo();
