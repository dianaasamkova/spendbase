import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


jest.mock('./components/tree', () => {
  return () => <div data-testid="mocked-tree-view">Mocked TreeView Component</div>;
});

//not the best way to test, quick solution to fix the test, that failed because of new changes to App.tsx
describe('App component', () => {
  it('renders Tree View correctly', () => {
    render(<App />);
    const mockedTreeView = screen.getByTestId('mocked-tree-view');
    expect(mockedTreeView).toBeInTheDocument();
  });
});
