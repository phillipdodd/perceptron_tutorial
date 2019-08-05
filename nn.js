function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

//? derivative of sigmoid
function dsigmoid(y) {
    // return sigmoid(x) * (1 - sigmoid(x))
    //? y has already been passed through sigmoid()
    return y * (1 - y);
}


class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        //* weights between input and hidden layers
        this.weights_ih = new Matrix(this.input_nodes, this.hidden_nodes);
        this.weights_ih.randomize();
        
        //* weights between hidden and output layers
        this.weights_ho = new Matrix(this.hidden_nodes, this.output_nodes);
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1);
        this.bias_h.randomize();
        this.bias_o = new Matrix(this.hidden_nodes, 1);
        this.bias_o.randomize();

        this.learningRate = 0.1;
    }

    feedforward(input_array) {
        //TODO can i use default param here?
        //* Receive Inputs
        let input = Matrix.fromArray(input_array);

        //* Generate Hidden Outputs
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        
        //* Pass through activation function
        hidden.map(sigmoid);
        //* Generate the Output's Output
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        return outputs.toArray();
    }

    train(input_array, target_array) {
        // let outputs = this.feedforward(inputs);
        let input = Matrix.fromArray(input_array);
        //* Generate Hidden Outputs
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);

        //* Pass through activation function
        hidden.map(sigmoid);

        //* Generate the Output's Output
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(sigmoid);

        //* Convert array to matrix object
        let targets = Matrix.fromArray(target_array)

        //* Calculate the error
        // ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);

        //* Calculate gradient
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learningRate);

        //* Calculate hidden -> output deltas
        let hidden_T = Matrix.transpose(hidden);
        let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);
        this.weights_ho.add(weights_ho_deltas);

        // TODO create a loop to handle the multiple hidden layers
        //* Calculate the hidden layer errors
        let transposed_weights_ho = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(transposed_weights_ho, output_errors);

        //* Calculate hidden gradient
        let hidden_gradient = Matrix.map(hidden, dsigmoid);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learningRate);  
        
        //* Calculate input -> hidden deltas
        let inputs_T = Matrix.transpose(input);
        let weights_ih_deltas = Matrix.multiply(hidden_gradient, inputs_T);
        this.weights_ih.add(weights_ih_deltas);

        outputs.print();
        targets.print();
        output_errors.print();
    }

}