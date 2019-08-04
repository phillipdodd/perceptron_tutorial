 function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        //* weights between input and hidden layers
        this.weight_ih = new Matrix(this.input_nodes, this.hidden_nodes);
        this.weight_ih.randomize();
        
        //* weights between hidden and output layers
        this.weight_ho = new Matrix(this.hidden_nodes, this.output_nodes);
        this.weight_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();
        this.bias_o = new Matrix(this.hidden_nodes, 1);
        this.bias_o.randomize();
    }

    feedforward(input_array) {
        //TODO can i use default param here?
        //* Receive Inputs
        let input = Matrix.fromArray(input_array);

        //* Generate Hidden Outputs
        let hidden = Matrix.multiply(this.weight_ih, input);
        hidden.add(this.bias_h);
        
        //* Pass through activation function
        hidden.map(sigmoid);
        //* Generate the Output's Output
        let output = Matrix.multiply(this.weight_ho, hidden);
        output.add(this.bias_o);
        output.map(sigmoid);

        return output.toArray();
    }

    train(inputs, targets) {
        let outputs = this.feedforward(inputs);

        //* Convert array to matrix object

        outputs = Matrix.fromArray(outputs)
        targets = Matrix.fromArray(targets)

        //* Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);

        // TODO create a loop to handle the multiple hidden layers
        //* Calculate the hidden layer errors
        let transposed_weights_ho = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(transposed_weights_ho, output_errors);

        

        outputs.print();
        targets.print();
        output_errors.print();
    }

}