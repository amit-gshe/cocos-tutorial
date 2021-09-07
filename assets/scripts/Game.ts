import {
  _decorator,
  Component,
  Node,
  Prefab,
  CCInteger,
  instantiate,
  UITransform,
  v3,
} from "cc";
import { Player } from "./Player";
const { ccclass, property, type } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Tue Sep 07 2021 22:28:31 GMT+0800 (中国标准时间)
 * Author = amit-gshe
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/scripts/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Game")
export class Game extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @type(Prefab)
  public starPrefab: Prefab;
  @type(CCInteger)
  public maxStarDuration: number = 0;
  @type(CCInteger)
  public minStarDuration: number = 0;
  @type(Node)
  public ground: Node;
  @type(Node)
  public player: Node;
  @type(CCInteger)
  @property({ tooltip: "The score of player", displayName: "Score (player)" })
  public score: number = 0;

  onLoad() {
      this.spawnNewStar()
  }

  start() {
    // [3]
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  private spawnNewStar() {
    const newStar = instantiate(this.starPrefab);
    this.node.addChild(newStar);
    newStar.setPosition(this.newStarPosition);
  }

  private get newStarPosition() {
    var randX = 0;
    const ground = this.ground.getComponent(UITransform);
    const groundY = this.ground.position.y + ground.height / 2;
    // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
    var randY =
      groundY +
      Math.random() * this.player.getComponent(Player).jumpHeight +
      50;
    // 根据屏幕宽度，随机得到一个星星 x 坐标
    const canvas = this.getComponent(UITransform);
    var maxX = canvas.width / 2;
    console.log(maxX);
    
    randX = (Math.random() - 0.5) * 2 * maxX;
    console.log(randX);
    
    // 返回星星坐标
    return v3(randX, randY, 0);
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
