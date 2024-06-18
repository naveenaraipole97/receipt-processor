build:
	docker build -t receipt-processor .

run:
	docker run -p 3000:3000 receipt-processor
