export default ({ markup, helmet, reduxState, scripts, styles }) => {
    return `
        <!DOCTYPE html>
			<html ${helmet.htmlAttributes.toString()}>
				<head>
					${helmet.title.toString()}
					${helmet.meta.toString()}
					${helmet.link.toString()}	
					${styles.map(style => {return `<link href="/public/${style.file}" rel="stylesheet" />`}).join('\n')}				
				</head>
				<body ${helmet.bodyAttributes.toString()}>
					<div id="app">${markup}</div>
					<script>window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}</script>
					<script src="/public/main.js" async></script>
					<link href="/public/main.css" rel="stylesheet" />
					${scripts.map(script => {return `<script src="/public/${script.file}"></script>`}).join('\n')}
					<script>window.main();</script>
				</body>
			</html>`;
};
