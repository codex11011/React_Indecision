const app = {
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = "";
    render();
  }
};

const MakeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);
};

const onRemoveOption = () => {
  app.options = [];
  render();
};

const appRoot = document.getElementById("app");
const render = () => {
  const template = (
    <div>
      <p>{app.options.length > 0 ? "here are your options" : "no options"}</p>
      <ol>
        {app.options.map(option => {
          return <li key={option}>{option}</li>;
        })}
      </ol>
      <button disabled={app.options.length === 0} onClick={MakeDecision}>
        make decision
      </button>
      <button onClick={onRemoveOption}>Remove all</button>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Options</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
};

render();
