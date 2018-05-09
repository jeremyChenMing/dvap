import { match, RoutingContext, createMemoryHistory } from 'dva/router';
import { renderToString } from 'react-dom/server'
import routes from './router';

export default function (app, req, res) {
    console.log(req)
    match({
        routes,
        location: req.url,
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (renderProps) {
            const html = renderToString(app.start()({ renderProps }));
            res.end(renderFullPage(html, {}));
        } else{
            res.status(404).send('not found')
        }
    })
}

function renderFullPage(html, initialState) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/static/index.css" />
</head>
<body>
  <div id="root">
    <div>
      ${html}
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
  </script>
  <script src="/static/index.js"></script>
</body>
</html>
  `;
}