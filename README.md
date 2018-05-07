### 手动简单实现react的一些内部逻辑

- src_react，是基础使用react实现的逻辑
> 如果要使用，重命名为src

- src_redux/libs/mini_redux.js，是手动实现的redux的核心模块的内部逻辑
    - createStore
    - combineReducers
    - store的3个方法
        - dispatch(action)
        - getState()
        - subscribe(listener)

- src/libs/mini_react-redux.js，是手动实现的react-redux的核心模块的内部逻辑
    - Provider
    - connect