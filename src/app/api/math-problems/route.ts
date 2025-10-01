import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get('grade'); // '1-5' or '5-8'
    const count = parseInt(searchParams.get('count') || '10');

    const generateAdditionProblem = (gradeLevel: string) => {
      let num1: number, num2: number;

      if (gradeLevel === '1-5') {
        // Grades 1-5: Smaller numbers, simpler problems
        num1 = Math.floor(Math.random() * 400) + 100; // 100-499
        num2 = Math.floor(Math.random() * 300) + 100; // 100-399
      } else {
        // Grades 5-8: Larger numbers, more challenging
        num1 = Math.floor(Math.random() * 700) + 300; // 300-999
        num2 = Math.floor(Math.random() * 600) + 300; // 300-899
      }

      const correctAnswer = num1 + num2;

      // Generate wrong answers (distractors)
      const generateDistractor = () => {
        const variation = Math.floor(Math.random() * 200) - 100; // -100 to +100
        return Math.max(100, correctAnswer + variation);
      };

      const options = [
        correctAnswer,
        generateDistractor(),
        generateDistractor(),
        generateDistractor()
      ].sort(() => Math.random() - 0.5);

      return {
        id: `addition-${Date.now()}-${Math.random()}`,
        type: 'multiple-choice' as const,
        question: `${num1} + ${num2} = ?`,
        problem: {
          num1,
          num2,
          operation: 'addition'
        },
        options: options.map(String),
        correctAnswer: String(correctAnswer),
        explanation: `Step by step:\n${num1} + ${num2} = ${correctAnswer}`,
        difficulty: gradeLevel === '1-5' ? 'easy' : 'medium',
        category: 'math-addition',
        points: gradeLevel === '1-5' ? 10 : 15,
        gradeLevel
      };
    };

    const problems = Array.from({ length: count }, () => 
      generateAdditionProblem(grade || '1-5')
    );

    return NextResponse.json({
      problems,
      metadata: {
        gradeLevel: grade || '1-5',
        totalProblems: count,
        difficulty: grade === '5-8' ? 'medium' : 'easy'
      }
    });

  } catch (error) {
    console.error('Error generating math problems:', error);
    return NextResponse.json(
      { error: 'Failed to generate math problems' },
      { status: 500 }
    );
  }
}
