#pragma once
#include "path_state.hpp"
#include "path_data_state.hpp"
namespace mapcore {
struct PathTransformation {
    PathState initialState;
    PathState finalState;
    PathDataState initialDataState;
    PathDataState finalDataState;
};
}
