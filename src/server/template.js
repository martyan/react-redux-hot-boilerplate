export default ({ markup, helmet }) => {
	return `<!DOCTYPE html>
			<html ${helmet.htmlAttributes.toString()}>
				<head>
					${helmet.title.toString()}
					${helmet.meta.toString()}
					${helmet.link.toString()}					
				</head>
				<body ${helmet.bodyAttributes.toString()}>
					<div id="app">${markup}</div>
					<script src="/public/client.js" async></script>
					<link href="/public/styles.css" rel="stylesheet" />
				</body>
			</html>`;
};