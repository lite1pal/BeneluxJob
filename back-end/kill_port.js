const fkill = require("fkill");

const port = 4001;

async function killPort() {
  try {
    const processes = await fkill(`:${port}`);
    console.log(`Successfully killed the process running on port ${port}.`);
  } catch (error) {
    console.error(
      `Failed to kill the process running on port ${port}. Error:`,
      error
    );
  }
}

killPort();
