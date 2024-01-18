import { Message, TextMessage } from "@orbifold/entities";
export class FakeInterpreter{
    public async execute(message:Message){
        return new TextMessage("This is the output of input " + message.id + " at " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}));
    }
}