.PHONY: output potrace

potrace:
	@docker build -t mathmagicians/image-transform --target potrace .
	@docker run --rm -it --name potrace -v "$(PWD)":/images mathmagicians/image-transform

process:
	@docker build \
	--target magic .

output:
	@docker build \
	--output output \
	--target output .
