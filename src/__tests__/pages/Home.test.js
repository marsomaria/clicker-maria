import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home';

// describe('<Home />', () => {
	test('should render Home', () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByTestId('clicker-game-h2')).toBeInTheDocument();
		expect(screen.getByTestId('sign-name')).toBeInTheDocument();
		expect(screen.getByTestId('input-name')).toBeInTheDocument();
		expect(screen.getByTestId('join-button')).toBeInTheDocument();

		// expect(screen.getByTestId('text-home-app-name')).toBeInTheDocument();
		// expect(screen.getByTestId('text-home')).toBeInTheDocument();
		// expect(screen.getByTestId('text-home')).toBeInTheDocument();
		// expect(screen.getByTestId('input-home')).toBeInTheDocument();
		// expect(screen.getByTestId('button-home')).toBeInTheDocument();
	});
	test('should find text values in Home', async () => {
		render(
			<BrowserRouter>
				<Home />
			</BrowserRouter>
		);
		expect(screen.getByText(/Clicker game/i)).toBeTruthy();
        expect(screen.getByText(/sign in with a name/i)).toBeTruthy();
        // expect(screen.getByRole('button')).toBeTruthy();
        
        expect(screen.getByText(/START/i)).toBeTruthy();
		// expect(screen.getByText(/Clicker!/i)).toBeTruthy();
		// expect(screen.getByText(/Create new Player/i)).toBeTruthy();
		// expect(screen.getByRole('button')).toBeTruthy();
		// expect(screen.getByText(/Join/i)).toBeTruthy();
	});
// });