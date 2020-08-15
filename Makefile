.PHONY: deploy
deploy:
	npm run build
	cp ./build/index.html ./build/200.html
	surge ./build --domain view-source.surge.sh
