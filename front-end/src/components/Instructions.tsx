interface InstructionsProps {
  winner: string | null;
  currentPlayer: string;
}

const Instructions = ({ winner, currentPlayer }: InstructionsProps) => {
  return (
    <div id="instructions">
      {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
    </div>
  );
};

export default Instructions;
