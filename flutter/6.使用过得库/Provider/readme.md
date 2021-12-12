# Package - Provider

> version: 6.0.1
> Provider 是用于 flutter 中用于数据管理的一个库，类似于 redux， vuex 等前端工具库

## Provider 什么时候使用？

- 当程序比较复杂，拥有许多数据需要管理时使用
- 当应用性能出现瓶颈时，需要优化加载性能时使用

## Provider 由哪几部分组成？

Provider 主要分为两部分

1. 数据提供者

- 1）**Provider** (数据变化，不更新 UI)
- 2）**ChangeNotifierProvider** (数据变化，自动更新 UI)
- 3）**MultiProvider** (使用多个数据源)
- 4）**InheritedProvider**
- 5）**FutureProvider**
- 6）**StreamProvider**
- 7）**ChangeNotifierProxyProvider (23456)**
- 8）**ProxyProvider (23456)**

2. 数据使用者

- 1）**Provider.of()**
- 2）**Consumer(23456)**(部分刷新)
- 3）**Selector(23456)**(部分刷新,比 Consumer 更为精细控制)
- 4）**InheritedContext**

> Provider 对 BuildContext 对象进行了扩展

- 1）**BuildContext.watch**(等同 Provider.of())
- 2）**BuildContext.watch**(等同 Consumer)
- 3）**BuildContext.select**(等同 Selector)

## Provider 如何使用？

1.创建

```dart
import 'package:flutter/cupertino.dart';

class HomeModelProvider extends ChangeNotifier {
  int counter = 0;

  increment() {
    counter++;
    notifyListeners(); // 通知Flutter需要更新UI
  }
}
```

2.读取 & 更新

```dart
class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  HomeModelProvider homeModelProvider = HomeModelProvider();

  @override
  Widget build(BuildContext context) {

    return ChangeNotifierProvider<HomeModelProvider>(
      create: (_) => homeModelProvider,
      child: Scaffold(
        appBar: AppBar(
          title: Text("provider使用"),
        ),
        body:Column(children:[
         // 当前widget中，需要读取provider中数据，使用Consumer包裹
          Consumer(builder: (_, HomeModelProvider notify, child) {
            return Text(
              notify.counter.toString(),
            ),
          },
          Selector<HomeModelProvider, int>(
            selector: (_, dataProvider) => dataProvider.counter,
            builder: (_, data, child) {
              return Text(
                data.toString(),
              );
            },
            child: const Text("data"),
          ),
          const SubWidget(),
        ]),
        floatingActionButton: FloatingActionButton(
          // 调用provider中方法，更新其中的数据
          onPressed: (){
            homeModelProvider.increment();
          },
          tooltip: 'Increment',
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}

class SubWidget extends StatelessWidget {
  const SubWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    /// 重要 使用 BuildContext.watch
    final homeProvider = context.watch<HomeModelProvider>();

    /// 重要 使用 BuildContext.select
    final count = context.select((HomeModelProvider countNotifier2) => countNotifier2.counter);

    return Column(
      children: [
        // 子部件,访问方式一
        Text(Provider.of<HomeModelProvider>(context).counter.toString()),

        // 子部件,访问方式二
        Text(context.read<HomeModelProvider>().counter.toString()),

        // 子部件,访问方式三 - BuildContext.watch
        Text(homeProvider.counter.toString()),

        // 子部件,访问方式四 - BuildContext.select
        Text(count.toString()),

        TextButton(
            onPressed: () {
              Provider.of<HomeModelProvider>(context, listen: false).add();
            },
            child: const Icon(Icons.touch_app)),
      ],
    );
  }

  update() {}
}

```

### 小技巧

- 对于创建 Provider 的 StatefulWiget（MyHomePage）： 通过实例对象去访问，比如访问直接使用 `homeModelProvider`, 如果有使用到 Provider 数据并更新的地方，，则需要对该 widget 使用 Consumer 进行包裹

- 对于子部件（SubWidget）：无需将 homeModelProvider 传递到子部件中，直接使用 `Provider.of<HomeModelProvider>(context)`来访问父级的 Provider 数据,或者第二种方式`context.read<HomeModelProvider>()`
