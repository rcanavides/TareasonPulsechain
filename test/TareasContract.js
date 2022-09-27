const TareasContract = artifacts.require("TareasContract");

contract("TareasContract", (accounts) => {
  before(async () => {
    this.tc = await TareasContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.tc.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it('traer Tareas Lista', async () => {
    const tareasContador = await this.tc.tareasContador();
    const tarea = await this.tc.tareas(tareasContador);

    assert.equal(tarea.id.toNumber(),tareasContador);
    assert.equal(tarea.titulo, "mi primer tarea");
    assert.equal(tarea.descripcion, "mi primer descripcion");
    assert.equal(tarea.done, false);
    assert.equal(tareasContador, 1);
  });

  it("tarea creada correctamente", async () => {
    const result = await this.tc.createTarea("segunda tarea", "segunda descripcion");
    const tareaEvent = result.logs[0].args;
    const tareasContador = await this.tc.tareasContador();

    assert.equal(tareasContador, 2);
    assert.equal(tareaEvent.id.toNumber(), 2);
    assert.equal(tareaEvent.titulo, "segunda tarea");
    assert.equal(tareaEvent.descripcion, "segunda descripcion");
    assert.equal(tareaEvent.done, false);
  });

  it("tarea toggled done", async () => {
    const result = await this.tc.toggleDone(1);
    const tareaEvent = result.logs[0].args;
    const tarea = await this.tc.tareas(1);

    //assert.equal(tarea.done, true);
    assert.equal(tareaEvent.id.toNumber(), 1);
    assert.equal(tareaEvent.done, true);
  });
});