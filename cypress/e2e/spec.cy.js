describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
  
  it('Editar uma tarefa e salvar', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li label')
      .dblclick();

    cy.get('.edit')
      .clear()
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li label')
      .should('have.text', 'TP2 de Engenharia de Software');

  });

  it ('Marca e desmarca as tarefas', () => {
    cy.visit('http://127.0.0.1:7001'); 
    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('TP2 de Compiladores{enter}');

    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .first()
      .should('be.checked');
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.toggle')
      .last()
      .should('be.checked');

    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .first()
      .should('not.be.checked');
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.toggle')
      .last()
      .should('not.be.checked');

  });

  it ('Apagar todas apos concluídas', () => {
    cy.visit('http://127.0.0.1:7001'); 
    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('TP2 de Compiladores{enter}');

    cy.get('.toggle')
      .first()
      .click();
    cy.get('.toggle')
      .last()
      .click();
    cy.get('.todo-list li')
      .should('have.length', 2);

    cy.get('.clear-completed')
      .click();
    cy.get('.todo-list li')
      .should('have.length', 0);
  });



});