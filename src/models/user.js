import querystring from 'querystring'
// import pathToRegexp from 'path-to-regexp';
import * as usersService from '../services/users'
// import key from 'keymaster'

export default {
  namespace: 'user',
  state: {
    list: [],
    total: 0,
    page: 1
  },
  reducers: {
    save (state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page }
    }
  },
  effects: {
    * fetch ({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, parseInt(page))
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10)
        }
      })
    },
    * remove ({ payload: id }, { call, put, select }) {
      yield call(usersService.remove, id)
      const page = yield select(state => state.users.page)
      yield put({ type: 'fetch', payload: { page } })
    },
    * patch ({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values)
      const page = yield select(state => state.users.page)
      yield put({ type: 'fetch', payload: { page } })
    }
    // call 请求异步 yield将异步同步  类似于async await
    // select 选择当前state中的值
    // put用来发action
  },
  subscriptions: {
    setup ({ dispatch, history }, done) {
      // done({message:'44'}) 用来抛出错误的
      return history.listen((a) => {
        // const query = querystring.parse(a.search.substringsubstring(1))
        // const match = pathToRegexp('/users/:id').exec(a.pathname);
        // if (match) {
        //   const userId = match[1];
        // }
        if (a.pathname.indexOf('/users') !== -1) {
          // dispatch({ type: 'fetch', payload: query })
        }
      })
    },
    // keyEvent({dispatch}) {
    //   console.log('8888888')
    //   key('⌘+b, ctrl+b', () => { console.log('123123123') });
    // },
    // keyboardWatcher({ dispatch }) {
    //   console.log('8888888')
    //   key('⌘+v, ctrl+v',(e, handler) => { 
    //     // console.log(e.view.document,'666666666')
    //     document.addEventListener('paste', function (event) {
    //       console.log(event);
    //       var isChrome = false;
    //       if (event.clipboardData || event.originalEvent) {
    //           //某些chrome版本使用的是event.originalEvent
    //           var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
    //           if(clipboardData.items){
    //               // for chrome
    //               var  items = clipboardData.items,
    //                   len = items.length,
    //                   blob = null;
    //               isChrome = true;
    //               for (var i = 0; i < len; i++) {
    //                   console.log(items[i]);
    //                   if (items[i].type.indexOf("image") !== -1) {
    //                       //getAsFile() 此方法只是living standard firefox ie11 并不支持
    //                       blob = items[i].getAsFile();
    //                   }
    //               }
    //               if(blob!==null){
    //                   var blobUrl=URL.createObjectURL(blob);
    //                   console.log(blobUrl)
    //                   //blob对象显示
    //                   // document.getElementById("imgNode").src=blobUrl;
    //                   var reader = new FileReader();

    //                   //base64码显示
    //                   reader.onload = function (event) {
    //                       // event.target.result 即为图片的Base64编码字符串
    //                       var base64_str = event.target.result;
    //                       console.log('12312312312')
    //                       document.getElementById("imgNode").src=base64_str;
    //                   }
    //                   reader.readAsDataURL(blob);

    //                   var fd = new FormData(document.forms[0]);
    //                   fd.append("the_file", blob, 'image.png');
    //                   console.log(fd)
    //                   // //创建XMLHttpRequest对象
    //                   // var xhr = new XMLHttpRequest();
    //                   // xhr.open('POST','/image' );
    //                   // xhr.onload = function () {
    //                   //     if ( xhr.readyState === 4 ) {
    //                   //         if ( xhr.status === 200 ) {
    //                   //             var data = JSON.parse( xhr.responseText );
    //                   //             console.log(data);
    //                   //         } else {
    //                   //             console.log( xhr.statusText );
    //                   //         }
    //                   //     };
    //                   // };
    //                   // xhr.onerror = function (e) {
    //                   //     console.log( xhr.statusText );
    //                   // }
    //                   // xhr.send(fd);
    //               }
    //           }
    //       }




    //     })
    //   })
    // }
    // 需要插件帮助
  }
}
