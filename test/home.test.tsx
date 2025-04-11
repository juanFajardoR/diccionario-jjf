import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';


describe('Home', () => {
    it('muestra el input de búsqueda', () => {
      render(<Home />)
      const input = screen.getByPlaceholderText('Buscar palabra...')
      expect(input).toBeInTheDocument()
    })
  })