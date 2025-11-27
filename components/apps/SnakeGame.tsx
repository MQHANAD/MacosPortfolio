import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

const GRID_SIZE = 20;
const GAME_SPEED = 150;

export default function SnakeGame() {
    const isMobile = useIsMobile();
    const CELL_SIZE = isMobile ? 15 : 20;

    const INITIAL_SNAKE = [{ x: 10, y: 10 }];
    const INITIAL_DIRECTION = { x: 0, y: -1 };

    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState({ x: 15, y: 5 });
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);

    // Ref to track direction processed in the last game tick to prevent 180-degree turns in one tick
    const lastProcessedDirection = useRef(INITIAL_DIRECTION);
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

    // Generate food that doesn't overlap with snake
    const generateFood = useCallback((currentSnake: { x: number, y: number }[]) => {
        let newFood: { x: number; y: number };
        let isOnSnake;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
        } while (isOnSnake);
        return newFood;
    }, []);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        lastProcessedDirection.current = INITIAL_DIRECTION;
        setGameOver(false);
        setScore(0);
        setFood(generateFood(INITIAL_SNAKE));
        setIsPlaying(true);
    };

    const checkCollision = (head: { x: number; y: number }) => {
        // Wall collision
        if (
            head.x < 0 ||
            head.x >= GRID_SIZE ||
            head.y < 0 ||
            head.y >= GRID_SIZE
        ) {
            return true;
        }
        // Self collision
        for (const segment of snake) {
            if (head.x === segment.x && head.y === segment.y) {
                return true;
            }
        }
        return false;
    };

    const moveSnake = useCallback(() => {
        if (gameOver || !isPlaying) return;

        setSnake((prevSnake) => {
            const newHead = {
                x: prevSnake[0].x + direction.x,
                y: prevSnake[0].y + direction.y,
            };

            if (checkCollision(newHead)) {
                setGameOver(true);
                setIsPlaying(false);
                if (score > highScore) {
                    setHighScore(score);
                }
                return prevSnake;
            }

            const newSnake = [newHead, ...prevSnake];

            // Update last processed direction after a successful move step
            lastProcessedDirection.current = direction;

            if (newHead.x === food.x && newHead.y === food.y) {
                setScore((prev) => prev + 1);
                setFood(generateFood(newSnake));
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, gameOver, isPlaying, score, highScore, generateFood, CELL_SIZE]); // Added CELL_SIZE dependency implicitly if needed, but it's used in render

    useEffect(() => {
        if (isPlaying && !gameOver) {
            gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        }

        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [isPlaying, gameOver, moveSnake]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Prevent default scrolling for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            const currentDir = lastProcessedDirection.current;

            switch (e.key) {
                case 'ArrowUp':
                    if (currentDir.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                    if (currentDir.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                    if (currentDir.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                    if (currentDir.x === 0) setDirection({ x: 1, y: 0 });
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []); // Empty dependency array as we use ref for current direction

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-full bg-gray-900 text-white p-4 font-mono select-none gap-8">
            {/* Left Side: Scores */}
            <div className="flex flex-row md:flex-col gap-8 md:gap-4 text-xl md:text-right md:items-end order-1 md:order-none">
                <div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">Score</div>
                    <span className="text-green-400 text-3xl font-bold">{score}</span>
                </div>
                <div>
                    <div className="text-gray-400 text-sm uppercase tracking-wider mb-1">High Score</div>
                    <span className="text-yellow-400 text-3xl font-bold">{highScore}</span>
                </div>
            </div>

            {/* Center: Game Board */}
            <div className="flex flex-col items-center gap-4 order-2 md:order-none">
                <div className="border-2 md:border-4 border-gray-700 rounded-lg shadow-2xl overflow-hidden shrink-0">
                    <div
                        className="relative bg-black"
                        style={{
                            width: GRID_SIZE * CELL_SIZE,
                            height: GRID_SIZE * CELL_SIZE,
                        }}
                    >
                        {snake.map((segment, i) => (
                            <div
                                key={i}
                                className="absolute bg-green-500 rounded-sm"
                                style={{
                                    left: segment.x * CELL_SIZE,
                                    top: segment.y * CELL_SIZE,
                                    width: CELL_SIZE - 2,
                                    height: CELL_SIZE - 2,
                                    zIndex: 10,
                                }}
                            />
                        ))}
                        <div
                            className="absolute bg-red-500 rounded-full"
                            style={{
                                left: food.x * CELL_SIZE,
                                top: food.y * CELL_SIZE,
                                width: CELL_SIZE - 2,
                                height: CELL_SIZE - 2,
                            }}
                        />

                        {gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                                <h2 className="text-3xl font-bold text-red-500 mb-4">GAME OVER</h2>
                                <button
                                    onClick={resetGame}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-colors font-bold"
                                >
                                    <RotateCcw size={20} />
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!isPlaying && !gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-bold shadow-lg transform hover:scale-105"
                                >
                                    <Play size={20} />
                                    {score === 0 ? 'Start Game' : 'Resume'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Controls */}
                <div className="grid grid-cols-3 gap-2 md:hidden">
                    <div />
                    <button
                        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center active:bg-gray-700 border border-gray-600"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            if (lastProcessedDirection.current.y === 0) setDirection({ x: 0, y: -1 });
                        }}
                    >
                        <span className="text-xl">↑</span>
                    </button>
                    <div />
                    <button
                        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center active:bg-gray-700 border border-gray-600"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            if (lastProcessedDirection.current.x === 0) setDirection({ x: -1, y: 0 });
                        }}
                    >
                        <span className="text-xl">←</span>
                    </button>
                    <button
                        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center active:bg-gray-700 border border-gray-600"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            if (lastProcessedDirection.current.y === 0) setDirection({ x: 0, y: 1 });
                        }}
                    >
                        <span className="text-xl">↓</span>
                    </button>
                    <button
                        className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center active:bg-gray-700 border border-gray-600"
                        onPointerDown={(e) => {
                            e.preventDefault();
                            if (lastProcessedDirection.current.x === 0) setDirection({ x: 1, y: 0 });
                        }}
                    >
                        <span className="text-xl">→</span>
                    </button>
                </div>
            </div>

            {/* Right Side: Controls */}
            <div className="flex flex-row md:flex-col gap-4 order-3 md:order-none">
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    disabled={gameOver}
                    className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 disabled:opacity-50 transition-colors shadow-lg border border-gray-700"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                    onClick={resetGame}
                    className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors shadow-lg border border-gray-700"
                    title="Reset Game"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* Instructions (Mobile only or absolute positioned?) */}
            {/* Let's hide instructions on desktop or put them somewhere else if needed. 
                For now, maybe just remove them or put them under the game on mobile? 
                The user didn't ask for them specifically, but they are useful.
                Let's put them absolute bottom or just hide them for cleaner look as requested layout is specific.
            */}
            <div className="absolute bottom-4 text-gray-500 text-xs md:text-sm opacity-50">
                Use arrow keys to move
            </div>
        </div>
    );
}
