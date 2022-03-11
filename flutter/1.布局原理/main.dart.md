import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    // https://juejin.im/post/6844904176489594893
    final mediaQueryData = MediaQuery.of(context);

    final screenWidth = mediaQueryData.size.width;
    final screenHeight = mediaQueryData.size.height;
    final physicalWidth = window.physicalSize.width;
    final physicalHeight = window.physicalSize.height;

    final dpr = window.devicePixelRatio;

    // 3.状态栏的高度  有刘海的屏幕:44 没有刘海的屏幕为20
    final statusBarHeight = mediaQueryData.padding.top;
    // 有刘海的屏幕:34 没有刘海的屏幕0
    final bottomHeight = mediaQueryData.padding.bottom;

    print("屏幕尺寸 width: $screenWidth height: $screenHeight");
    print("分辨率: $physicalWidth - $physicalHeight");
    print('设备dpr： $dpr');
    print("状态栏height: $statusBarHeight 底部高度:$bottomHeight");

    double scaleWidth = 600 / 1920; // x *

    ScreenUtil.init(
      BoxConstraints(
        maxWidth: MediaQuery.of(context).size.width,
        maxHeight: MediaQuery.of(context).size.height,
      ),
      designSize: const Size(1920, 1080),
      orientation: Orientation.landscape,
    );
    return Scaffold(
      body: Column(
        children: <Widget>[
          Container(
            height: 156 / dpr,
            width: double.infinity,
            color: Colors.blueGrey,
          ),
          const Text(
            'You have pushed the button this many times:',
          ),
          Text(
            '$_counter',
            style: Theme.of(context).textTheme.headline4,
          ),
          Container(
            width: 30,
            height: 30,
            color: Colors.black,
          ),
          Container(
            width: 15,
            height: 15,
            color: Colors.black,
          ),
          Container(
            width: 30 / dpr,
            height: 30 / dpr,
            color: Colors.red,
          ),
          Container(
            width: 9.375,
            height: 9.375,
            color: Colors.blueAccent,
          ),
          Container(
            width: 30.w,
            height: 30.w,
            color: Colors.pink,
          ),
          Container(
            width: 30.r,
            height: 30.r,
            color: Colors.pink,
          ),
          Container(
            width: 30.h,
            height: 30.h,
            color: Colors.orange,
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}
