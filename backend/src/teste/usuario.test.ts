import { Usuario } from "../models/usuario";

describe('Classe Usuario', () => {
  it('deve criar um objeto Usuario corretamente', () => {
    const usuario = new Usuario(
      'Giselle Eggert',
      '4799913280',
      '02188802596',
      'gieggert@gmail.com',
      'gi_eggert@01',
      27
    );

    expect(usuario).toBeInstanceOf(Usuario);
    expect(usuario.id).toBe(27);
    expect(usuario.nome).toBe('Giselle Eggert');
    expect(usuario.telefone).toBe('4799913280');
    expect(usuario.cpf).toBe('02188802596');
    expect(usuario.email).toBe('gieggert@gmail.com');
    expect(usuario.senha).toBe('gi_eggert@01');
  });

  it('deve criar um Usuario mesmo sem o id opcional', () => {
    const usuario = new Usuario(
        'Sibelle Eggert',
        '47991099339',
        '02982794656',
        'sieggert@gmail.com',
        'si_eggert@01'
    );

    expect(usuario.id).toBeUndefined();
    expect(usuario.nome).toBe('Sibelle Eggert');
  });
});
