web:
	make clean
	NODE_ENV=$$NODE_ENV TARGET=web make build

webos:
	make clean
	NODE_ENV=$$NODE_ENV TARGET=webos make build
	cp target/webos/* dist/
	ares-package dist

clean:
	rm -rf dist
	rm -rf build

build:
	NODE_ENV=$$NODE_ENV TARGET=$$TARGET yarn build
	cp src/html/index.html dist/index.html
	./node_modules/.bin/lessc --global-var="scale=1" src/less/app.less dist/app-720p.css
	./node_modules/.bin/lessc --global-var="scale=1.5" src/less/app.less dist/app-1080p.css

