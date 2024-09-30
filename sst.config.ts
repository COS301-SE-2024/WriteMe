/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: "writeme",
			removal: input?.stage === "production" ? "retain" : "remove",
			home: "aws",
		};
	},
	async run() {
		const bucket = new sst.aws.Bucket("WriteMe", {
			access: "public",
		});

		new sst.aws.Nextjs("WriteMe-next", {
			link: [bucket],
			path: "apps/writeme",
		});
	},
});
