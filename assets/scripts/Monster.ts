import { _decorator, Component, Node, tween, v3 } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Monster
 * DateTime = Tue Sep 07 2021 21:35:14 GMT+0800 (中国标准时间)
 * Author = amit-gshe
 * FileBasename = Monster.ts
 * FileBasenameNoExtension = Monster
 * URL = db://assets/scripts/Monster.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Monster")
export class Monster extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  private _jumpHeight: number = 200;
  // 主角跳跃持续时间
  private _jumpDuration: number = 0.3;

  onLoad() {
    this.runJumpAction(this.node);
  }

  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  runJumpAction(target: Node) {
    // 跳跃上升
    const jumpUp = tween().by(
      this._jumpDuration,
      { position: v3(0, this._jumpHeight) },
      { easing: "sineOut" }
    );
    const jumpDown = tween().by(
      this._jumpDuration,
      { position: v3(0, -this._jumpHeight) },
      { easing: "sineIn" }
    );
    tween(target).sequence(jumpUp, jumpDown).repeatForever().start();
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
