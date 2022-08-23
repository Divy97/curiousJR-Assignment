//Bot Block
Blockly.Blocks["dropdown_bot"] = {
  init: function () {
    this.appendStatementInput("Bot").setCheck(null).appendField("Dropdown Bot");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

// Question Block
Blockly.Blocks["dropdown_questions"] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Select a Question: ")
      .appendField(
        new Blockly.FieldDropdown([
          // Questions provided by curiousJr and there value
          ["What is the date today?", "dropdown_date"],
          ["What is the time now?", "dropdown_time"],
          ["How are you?", "dropdown_greeting"],
          ["What is JavaScript?", "dropdown_language"],
          ["What is your name?", "dropdown_name"],
        ]),
        "question"
      );
    this.setPreviousStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

Blockly.JavaScript["dropdown_questions"] = function () {
  // javascript code to answer corresponding questions
  const botBlock = Blockly.getMainWorkspace()
    .getAllBlocks()
    .find((block) => block.type === "dropdown_bot");
  const questionBlock = botBlock.getInputTargetBlock("Bot");
  var dropdown_question =
    questionBlock && questionBlock.getFieldValue("question");
  var questions;
  switch (dropdown_question) {
    // What is the date today?
    case "dropdown_date":
      var today_Date = new Date();
      questions =
        "Date: " +
        today_Date.getDate() +
        "-" +
        (today_Date.getMonth() + 1) +
        "-" +
        today_Date.getFullYear();
      break;
    // What is the time now?
    case "dropdown_time":
      var today_Time = new Date();
      questions =
        "Time: " +
        today_Time.getHours() +
        ":" +
        today_Time.getMinutes() +
        ":" +
        today_Time.getSeconds() +
        " IST";
      break;
    // How are you?
    case "dropdown_greeting":
      questions = "I am doing great, How are you ?";
      break;
    //What is JavaScript?
    case "dropdown_language":
      questions =
        "JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive. ";
      break;
    //What is your name?
    case "dropdown_name":
      questions = "My name is Divy, I am a Dropdown Bot";
      break;
  }
  // returns the corresponding value to the UI.
  return `
    var inputTextValue = "${questions}";
    `;
};

Blockly.JavaScript["dropdown_bot"] = function (block) {
  // To receive the values from the question_asked Block
  return Blockly.JavaScript.statementToCode(block, "Bot");
};

// workSpace
var workspace = Blockly.inject("block_main__div", {
  toolbox: document.getElementById("toolbox"),
});

// reading value
function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

// Run and Reset Button
$(document).ready(function () {
  $("#runBtn").click(function () {
    runCode();
  });
  $("#resetBtn").click(function () {
    resetCode();
  });
});

function runCode() {
  var getValue = eval;
  try {
    getValue(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function resetCode() {
  delete inputTextValue;
  // clear the workspace
  Blockly.mainWorkspace.clear();
  redrawUi();
}
