// 观察者模式  观察者 被观察者  =》 观察者需要放到被观察者中 被观察者的状态发生变化需要通知观察者 我变化啦
// 内部基于发布订阅模式  收集观察者 状态变化后要通知观察者

class Subject { //被观察者
    constructor(name){
        this.state='开心的',
        this.observers=[];
        this.name=name;
    }
    attach(o){
        this.observers.push(o);
    }
    setState(newState){
        this.state= newState;
        this.observers.forEach(o=>o.update(this))
    }
}

class Observer{  //观察者
    constructor(name){
        this.name=name;
    }
    update(baby){
        console.log('当前'+this.name+'被通知了','当前的小宝宝'+baby.state);
    }

}
let baby = new Subject('小宝宝')
let parent = new Observer('爸爸')
let mother = new Observer('妈妈')
baby.attach(parent);
baby.attach(mother);
baby.setState('被欺负啦')
// 如果这两个人没有依赖关系 就是发布订阅 如果有依赖关系就是观察者模式