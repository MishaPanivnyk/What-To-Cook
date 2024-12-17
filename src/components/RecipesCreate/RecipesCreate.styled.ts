import styled from 'styled-components';
export const RecipesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* padding: 20px; */
  /* background-color: #f8f8f8; */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
export const RecipesImgIngContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;
export const RecipesImgContainer = styled.div`
  width: 500px;
  height: 100%;
  border-radius: 0px 0px 25px 25px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RecipesIngContainer = styled.div`
  width: 500px;
  height: 50vh;
  border-radius: 25px 25px 0px 0px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
  padding: 30px 15px;
`;
export const RecipesIngTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding-bottom: 15px;
  border-bottom: 2px solid;
  padding: 15px;
  border-radius: 10px 10px 0 0;
  background-color: rgba(44, 42, 42, 0.9);
`;
export const RecipesImgAdd = styled.label`
  color: #fff;
  border: none;
  background-color: initial;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
    color: red;
  }
`;
export const RecipesDescContainer = styled.div`
  width: 69vw;
  height: 100vh;
  padding: 30px;
  backdrop-filter: blur(10px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
`;
export const RecipesSection = styled.div`
  flex: 1 1 300px;
  display: flex;
  gap: 10px;
`;

export const RecipesTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const RecipesInput = styled.input`
  width: 50vw;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  padding: 20px;
  color: white;
  margin-bottom: 35px;
  border-radius: 30px;
  background-color: rgba(44, 42, 42, 0.9);
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
export const RecipesCategoryLabel = styled.label`
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  padding: 10px;
  white-space: pre-wrap;
  height: 30vh;
  border: none;
  border-radius: 0 0 10px 10px;
  color: white;
  background-color: rgba(44, 42, 42, 0.9);
  &::placeholder {
    color: white;
  }
`;
export const TextAreaInst = styled.textarea`
  width: 100%;
  height: 600px;
  resize: none;
  padding: 10px;
  white-space: pre-wrap;
  border: none;
  margin-bottom: 20px;
  border-radius: 10px;
  color: white;
  background-color: rgba(44, 42, 42, 0.9);
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
