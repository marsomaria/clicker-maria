import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

	test('this is going to render Home', () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByTestId('clicker-game-h2')).toBeInTheDocument();
		expect(screen.getByTestId('sign-name')).toBeInTheDocument();
		expect(screen.getByTestId('input-name')).toBeInTheDocument();
		expect(screen.getByTestId('join-button')).toBeInTheDocument();
	});
	test('this is goin to find text values in Home page', async () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByText(/Clicker game/i)).toBeTruthy();
        expect(screen.getByText(/sign in with a name/i)).toBeTruthy();
        expect(screen.getByRole('button')).toBeTruthy();
        expect(screen.getByText(/START/i)).toBeTruthy();
	});
