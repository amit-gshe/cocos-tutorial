import {
  _decorator,
  Component,
  systemEvent,
  SystemEvent,
  KeyCode,
  EventKeyboard,
  CCInteger,
} from "cc";
const { ccclass, type } = _decorator;

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
export class Player extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @type(CCInteger)
  public jumpHeight: number = 30;

  // 最大移动速度
  private _maxMoveSpeed: number = 5;
  private _xSpeed: number = 0;
  // 加速度
  private _accel: number = 100;
  private _accLeft: boolean = false;
  private _accRight: boolean = false;

  onLoad() {
    // 初始化跳跃动作
    this.registerKeyBoardEvent();
  }

  start() {
    // [3]
  }

  update(dt: number) {
    if (this._accLeft) {
      this._xSpeed -= this._accel * dt;
    }
    if (this._accRight) {
      this._xSpeed += this._accel * dt;
    }

    if (Math.abs(this._xSpeed) > this._maxMoveSpeed) {
      this._xSpeed =
        this._xSpeed > 0 ? this._maxMoveSpeed : -this._maxMoveSpeed;
    }
    if (this._xSpeed) {
      this.node.position = this.node.position.add3f(this._xSpeed, 0, 0);
    }
  }

  onKeyDownCallback(event: EventKeyboard) {
    console.log(event.keyCode, "key down");
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this._accLeft = true;
        break;
      case KeyCode.KEY_D:
        this._accRight = true;
        break;
    }
  }

  onKeyUpCallback(event: EventKeyboard) {
    console.log(event.keyCode, "key up");
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this._accLeft = false;
        break;
      case KeyCode.KEY_D:
        this._accRight = false;
        break;
    }
  }

  registerKeyBoardEvent() {
    systemEvent.on(
      SystemEvent.EventType.KEY_DOWN,
      (event) => this.onKeyDownCallback(event),
      this
    );
    systemEvent.on(
      SystemEvent.EventType.KEY_UP,
      (event) => this.onKeyUpCallback(event),
      this
    );
  }

  deregisterKeyBoardEvent() {
    systemEvent.off(SystemEvent.EventType.KEY_DOWN, null, this);
    systemEvent.off(SystemEvent.EventType.KEY_UP, null, this);
  }

  onDestroy() {
    this.deregisterKeyBoardEvent();
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
