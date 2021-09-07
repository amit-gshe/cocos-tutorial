import { _decorator, Component, tween, v3 } from "cc";
const { ccclass } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Sat Sep 04 2021 15:50:24 GMT+0800 (China Standard Time)
 * Author = amit-gshe
 * FileBasename = Player.ts
 * FileBasenameNoExtension = Player
 * URL = db://assets/scripts/Player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Player")
export class PlayerController extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  private _jumpHeight: number = 200;
  // 主角跳跃持续时间
  private _jumpDuration: number = 0.3;

  private _xSpeed: number = 10;

  onLoad() {
    // 初始化跳跃动作
    this.runJumpAction();
  }

  start() {
    // [3]
  }

  update(dt: number) {
    this.node.position = this.node.position.add3f(this._xSpeed, 0, 0);
  }

  runJumpAction() {
    // 跳跃上升
    var jumpUp = tween(this.node).by(
      this._jumpDuration,
      { position: v3(0, this._jumpHeight, 0) },
      { easing: "sineOut" }
    );
    // 下落
    var jumpDown = tween(this.node).by(
      this._jumpDuration,
      { position: v3(0, -this._jumpHeight, 0) },
      { easing: "sineIn" }
    );
    // 不断重复
    // tween(this.node).sequence(jumpUp, jumpDown).repeatForever().start();
    tween(this.node).sequence(jumpUp, jumpDown).repeat(5).start();
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
